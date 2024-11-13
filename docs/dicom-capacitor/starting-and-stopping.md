# Starting and Stopping the Service

To start and stop the DICOM Capacitor service:

1. Open the Services MMC (Start - Run - `services.msc`) and locate the `DICOM Capacitor` service.
2. Right-click the service and select `Start` or `Stop`.
3. To change the startup type, right-click the service and select `Properties`.

Alternatively, you can use the `sc` command-line tool to start and stop the service:

```cmd
sc start "DICOMCapacitorService"
sc stop "DICOMCapacitorService"
```
