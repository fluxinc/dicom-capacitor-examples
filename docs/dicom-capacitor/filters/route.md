# Route Filter

Capacitor's route fitler lets you route incoming DICOM data to different destinations (or disk) based on configurable criteria.
In order to enable the route filter, you must add the `route` filter to the `filters` section of your `config.yml` file.

```yaml
# config.yml

filters:
  - route
```

or, simply:

```yaml
# config.yml
filters: route
```

Once enabled, the route filter will use the `routings.yml` file to determine which destinations to route incoming DICOM data to.  If this file is missing or invalid DICOM Capacitor will halt with an error.

## Routing Example

An example `routings.yml` file is shown below:

```yaml
# routings.yml

# Drops all Dose SR instances
- Conditions:
    - Tag: 0002,0002
      MatchExpression: ^1\.2\.840\.10008\.5\.1\.4\.1\.1\.88\.67$
  Actions:
    - Description: Drop dose SR
      Type: drop

# Stash all SC instances to disk in the `C:/dicom` directory
- Conditions:
    - Tag: 8,60
      MatchExpression: ^SC$
  Actions:
    - Description: Save SC to disk
      Type: save_file
      Target: "C:/dicom/#{8,50}/#{8,18}.dcm"


# Route all instances with a comment that contains 
# the word "URGENT" to PACS_2
- AeTitles:
    - PACS_1
  Conditions:
    - Tag: 10,4000
      MatchExpression: ^.*URGENT.*$
  Actions:
    - Description: Send to PACS_2
      Target: MRPACS
      RemoveOriginal: true
```

## Route Components

Each route component is defined as follows:

- `AeTitles`: (Optional) The AE destination AE title to which this route applies.
- `Conditions`: (Optional) A list of conditions that must be met for this route to apply.
- `Actions`: (Required) A list of actions to take when this route applies.

### AeTitles

The `AeTitles` field is an optional list of AE titles that this route applies to.

- If this field is not provided, the route will apply to all AE titles.
- If this field is provided, the route will only apply to AE titles that match one of the provided values.

### Conditions

The `Conditions` field is an optional list of conditions that must be met for this route to apply.  If this field is not provided, the route will apply to all incoming DICOM data (provided that the `AeTitles` field is either not present, or is present and matches the incoming DICOM data).

Each condition component is defined as follows:

- `Tag`: The DICOM tag to match.
- `MatchExpression`: The DICOM match expression to match.  Expressions can be specified either as a string or as a regular expression.  When specifying regular expressions, remember to escape any special characters.

### Actions

The actions field is required, and must be a list of one or moreactions to take when this route applies.

Eacg action component is defined as follows:

- `Description`:  A description of the action that will appear in the logs.
- `Type`:  The type of action to take.  Possible values are:
  - `add_destination`: Adds the incoming DICOM data to the specified destination AE title
  - `save_file`: Saves the incoming DICOM data to disk
  - `drop`: Drops the incoming DICOM data.
- `RemoveOriginal`: (Optional)  
  Determines whether the incoming DICOM data should be removed from the cache after the action is taken.  The default value is `false`.
- `Target`: (Conditinally Requred)  
  The AE title to which the incoming DICOM data should be sent or the path to which the dataset should be saved.  This field is required if the `Type` field is `add_destination` or `save_file`.

#### Save File Parameters

The `save_file` action type will save the incoming DICOM data to disk.  The `Target` field is required, and must be a valid path on the local filesystem.  Additinallly, the `Target` may contain placeholders that will be replaced with the incoming DICOM data.  Placeholders are specified as `#{tag}`, where `tag` is the DICOM tag to be replaced.

For example the following action will save the incoming DICOM data to disk, replacing the `#{8,50}` placeholder with the incoming DICOM data's AccesionNumber (0008,0050) attribute:

```yaml
- Description: Save incoming DICOM data to disk
  Type: save_file
  Target: /path/to/incoming/#{8,50}/
  RemoveOriginal: false
```

Again, the RemoveOriginal field is optional, and defaults to `false` (we include it here for clarity). We frequently use this pattern to "stash" incoming DICOM data for additional testing or analysis.

## Route Examples


### Example 1: Stash incoming DICOM data to disk

The following route saves files to a directory structure that is based on the incoming DICOM data:

```yaml
- Actions:
    - Description: Save to disk
      Type: save_file
      Target: "C:/dicom/#{10,20}/#{8,20}_#{8,1030}_#{8,50}/#{20,11}_#{8,103e}/#{8,60}_#{20,13}.dcm"
      RemoveOriginal: true
```

The final path in this example might look like this:

```text
c:/dicom/PAT123456/20240501_Contrast_CT_ACC9401202/1_First_Series/CT_1.dcm
```

### Example 2: Match multiple conditions and send to multiple destinations

The following route matches incoming DICOM data with multiple conditions and sends it to multiple destinations:

```yaml
- AeTitles:
    - PACS
  Conditions:
    - Tag: 0002,0002
      MatchExpression: ^1\.2\.840\.10008\.5\.1\.4\.1\.1\.88\.67$
    - Tag: 0008,0050
      MatchExpression: ^CT$
  Actions:
    - Description: Send to PACS_1
      Target: PACS_1
      RemoveOriginal: false
    - Description: Send to PACS_2
      Target: PACS_2
      RemoveOriginal: true
```

> Note that the `RemoveOriginal` field is set to `false` for the first action, and `true` for the second action.  This is because we want to keep the incoming DICOM data in the cache after it has been sent to the PACS_1 destination, but we want to remove it from the cache after it has been sent to PACS_2.
