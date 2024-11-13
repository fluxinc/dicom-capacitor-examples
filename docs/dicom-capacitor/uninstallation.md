# Uninstallation

To uninstall the complete DICOM Capacitor application, follow these steps:

1. Open Add/Remove Programs (Start - Run - `appwiz.cpl`)
2. Locate DICOM Capacitor in the list of installed programs
3. Click `Uninstall`

Alternatively, you can use the `sc` command-line tool to uninstall the service:

```cmd
sc delete "DICOMCapacitorService"
```
