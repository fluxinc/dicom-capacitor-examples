# Sort Filter

The sort filter provides precise control over DICOM instance ordering within series, supporting both integer and string-based sorting. Sorts are defined in a `sortings.yml` file, and are applied to incoming DICOM data before it is sent to destinations.

In order to enable the sort filter, you must add the `sort` filter to the `filters` section of your `config.yml` file.

```yaml
# config.yml
filters:
  - sort
```
or, simply:

```yaml
# config.yml
filters: sort
```
## Sort Components
Each sort component is defined as follows:

- `AE Titles`: List of DICOM nodes where sorting applies.
- `Actions`: (Required) A list of actions to take when this sort applies.
- `Affects`: (Optional) A list of DICOM dataset contexts that this mutation affects. 
  - worklist_query
  - worklist_result
  - qr_find_query
  - qr_find_result

### Actions

The actions field is required, and must be a list of one or more actions to take when each sort applies.

Each action component is defined as follows:

- `Description`:  A description of the action that will appear in the logs.
- `Type`:  The type of action to take. This must be `sort`.
- `SortTag`: (Required) The DICOM tag to sort by.
- `SortType`: (Required) The type of data to sort. This must be either `integer` or `string`.
- `SortDirection`: (Required) The direction to sort. This must be either `asc` or `desc`.

## Sorting Examples

An example `sortings.yml` file is shown below:

```yaml
# Basic numeric instance sorting
- AeTitles:
    - offis
  Actions:
    - Description: "Sort by SeriesNumber"
      Type: sort
      SortTag: 0020,0011
      SortType: integer
      SortDirection: asc

# Multi-level MR sorting
- AeTitles:
    - mr_scanner
  Actions:
    - Description: "Sort by acquisition"
      Type: sort
      SortTag: 0020,0012
      SortType: integer
      SortDirection: asc
    - Description: "Sort by instance"
      Type: sort
      SortTag: 0020,0013
      SortType: integer
      SortDirection: asc
```
