# CapacitorFilers

Capacitor Filters are used to modify incoming DICOM data before it is sent to any destinations.  The following filters are available:

- [Route](/dicom-capacitor/filters/route): Routes incoming DICOM data to different destinations based on configurable criteria.
- [Mutate](/dicom-capacitor/filters/mutate): Mutates incoming DICOM data based on configurable criteria.
- [Anonymize](/dicom-capacitor/filters/anonymize): Anonymizes incoming DICOM data by removing or replacing identifying information.
- [Sort](/dicom-capacitor/filters/sort): Sorts images so they arrive at the destination in the correct order.

## Route

The route filter lets you route incoming DICOM data to different destinations (or disk) based on configurable criteria.
