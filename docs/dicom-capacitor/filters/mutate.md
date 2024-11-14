# Mutate Filter

The mutate filter lets you apply mutations to incoming DICOM data.  Mutations are defined in a `mutations.yml` file, and are applied to incoming DICOM data before it is sent to destinations.

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

## Mutate Components

Each mutation component is defined as follows:

- `Description`:  A description of the mutation that will appear in the logs.
- `Conditions`: (Optional) A list of conditions that must be met for this mutation to apply.
- `Actions`: (Required) A list of actions to take when this mutation applies.
- `Affects`: (Optional) A list of DICOM dataset contexts that this mutation affects.

### Conditions

The `Conditions` field is an optional list of conditions that must be met for this mutation to apply.  Conditions are a shared concept between the `route` and `mutate` filters, and are described in their own [Conditions](./conditions) page.
