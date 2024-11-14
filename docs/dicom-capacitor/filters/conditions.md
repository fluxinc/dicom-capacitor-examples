# Conditions

Conditions are used to determine whether a filter should apply to incoming DICOM data.  Conditions are a shared concept between the [Route](./route), [Mutate](./mutate), and [Sort](./sort) filters.

They will typically appear in the `Conditions` list of a filter definition, and will look like this:

```yaml
- Conditions:
  - Tag: 0008,0060
    MatchExpression: ^CT$
  Actions:
  - Type: add_or_update
    # etc...
```

## Tag

The `Tag` field is the DICOM tag to match.

## MatchExpression

The `MatchExpression` field is the DICOM match expression to match.  Expressions can be specified either as a string or as a regular expression.  When specifying regular expressions, remember to escape any special characters.

### Expression Patern Rules

Capacitor will use the following rules to determine whether to treat your expression as a string or regular expression:

#### Literal Patterns

- Plain text without any special characters will be matched exactly
- Numbers and dots (e.g. "1.2.3") are treated as literal patterns and dots are escaped automatically
- Example: "CHEST" will only match "CHEST"

#### Wildcard Patterns

- Use `*` to match zero or more characters
- Use `?` to match exactly one character
- Examples:
  - "CHEST*" matches "CHEST", "CHEST_PA", "CHEST_LATERAL" etc.
  - "CHEST?" matches "CHEST1", "CHEST2" but not "CHEST" or "CHEST_PA"

#### Regular Expressions

- Patterns starting with `^` are treated as full regular expressions
- Patterns containing regex special characters (`[](){}|+\`) are treated as regular expressions
- Examples:
  - `^CHEST.*PA$` matches strings starting with "CHEST" and ending with "PA"
  - `[ABC]CHEST` matches "ACHEST", "BCHEST", "CHEST"


### Matching Examples

The following examples demonstrate how to match DICOM values using string expressions and regular expressions:

#### Example 1: Match DICOM value with a string

```yaml
# Match DICOM value with a string
- Conditions:
  - Tag: 0008,0060
    MatchExpression: CT
```

#### Example 2: Match multiple DICOM values with multiple regular expression

```yaml
# Match multiple DICOM values with multiple regular expressions
- Conditions:
  - Tag: 0008,1030
    MatchExpression: Full*
  - Tag: 0008,0050
    MatchExpression: ^MR$
```
