# Mutate Filter

The mutate filter lets you apply mutations to incoming DICOM data.  Mutations are defined in a `mutations.yml` file, and are applied to incoming DICOM data before it is sent to destinations.

In order to enable the mutate filter, you must add the `mutate` filter to the `filters` section of your `config.yml` file.
```yaml
# config.yml
filters:
  - mutate
```
or, simply:

```yaml
# config.yml
filters: mutate
```
## Mutate Components

Each mutation component is defined as follows:

- `Conditions`: (Optional) A list of conditions that must be met for this mutation to apply.
- `Actions`: (Required) A list of actions to take when this mutation applies.
- `Affects`: (Optional) A list of DICOM dataset contexts that this mutation affects:
  - worklist_query
  - worklist_result
  - qr_find_query
  - qr_find_result

### Conditions

The `Conditions` field is an optional list of conditions that must be met for this mutation to apply.  Conditions are a shared concept between the `route` and `mutate` filters, and are described in their own [Conditions](./conditions) page.

### Actions

The actions field is required, and must be a list of one or more actions to take when each mutation applies.

Each action component is defined as follows:

- `Description`: A description of the action that will appear in the logs.

- `Type`: The type of action to take. Possible values are:

  - `add_or_update`: Adds new tags or updates existing ones based on pattern matching
  
  - `anonymize`: Anonymizes patient
  
  - `exclude_result`: Excludes the current dataset from processing
  
  - `query`: Performs a worklist query and merges results into the dataset
  
  - `remove`: Removes specified tags from the dataset
  
  - `stamp`: Adds visual stamps to image data

- `SourceTag`: (Optional, `add_or_update` action only) DICOM tag to match

- `DestinationTag`: (Required for `add_or_update`, `remove` and `stamp` actions) DICOM tag to modify

- `DestinationValue`: (Required for `add_or_update`, `remove` and `stamp` actions) New value

- `Node`: (Required for `query` type) The worklist node to query for additional data

- `Request`: (Required for `query` type) List of source/destination pairs defining query parameters:
  ```yaml
  Request:
    - SourceTag: 0010,0020
      DestinationTag: 0010,0020
  ```

- `Response`: (Required for `query` type) List of source/destination pairs defining result merging:
  ```yaml
  Response:
    - SourceTag: 0032,1060
      DestinationTag: 0008,1030
  ```

- `OnError`: (Optional - `add_or_remove` and `query` actions only) Error handling behavior:
  - `skip_action`: Skip current action
  - `end_mutation`: Stop mutation chain
  - `retry`: Retry operation
  - `fail`: Fail processing

## Mutations Example

An example `mutations.yml` file is shown below:

```yaml
# mutations.yml

# Change the SOP Class UID to CT Image Storage
- Description: Change SOP Class UID to CT Image Storage
  Conditions:
    - Tag: 0008,0016
      MatchExpression: ^1\.2\.840\.10008\.5\.1\.4\.1\.1\.2$
  Actions:
    - Tag: 0008,0016
      Expression: 1.2.840.10008.5.1.4.1.1.2.1

# Suffix the SeriesNumber with 8 if the ProtocolName ends with "id"
- Conditions:
    - MatchTag: 0018,1030
      MatchExpression: ^.*[A-Z]id.*$
  Actions:
    - Description:  Suffix SeriesNumber with 8
      Type: add_or_update
      Source:
        Tag: 0020,0011
        Expression: ^(.*)$
      Destination:
        Tag: 0020,0011
        Value: ${1}8

- Description: "Exclude specific study results"
  Affects:
    - qr_find_result
  Conditions:
    - Tag: "0008,0050"  # Accession Number
      Expression: "12345"
  Actions:
    - Type: exclude_result
```