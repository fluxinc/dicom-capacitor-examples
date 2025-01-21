# Installation

## Prerequisites

- Windows 10 or later, Windows Server 2016 or later, Linux or MacOS (x64 or arm64)
- .NET Core 8 or later
- 2 GB of RAM
- 1 GB of free disk space
- 2 GHz or faster, x64 or arm64, processor

## Windows Installation

1. Download the latest version of DICOM Capacitor from the [Flux Website](#)
2. Run the installer
3. Open your Services MMC and start and stop the DICOM Capacitor service
4. Open the `%ProgramData%\Flux\DICOM Capacitor\` folder, which contains the following files
    - `cache/` - Contains the cache of DICOM data
    - `log/` - Contains the logs for DICOM Capacitor
        - `capacitor_service.log` - Contains the main log for DICOM Capacitor
    - `nodes.yml` - Specifies the nodes that DICOM Capacitor will use to send and receive DICOM data
    - `config.yml` - Specifies the settings for DICOM Capacitor


## Command Line Installation
Install DICOM Capacitor as a Windows service:
```bash
DICOMCapacitorService.exe --install
```

### Custom Path Installation 
Install with a specific base directory:
```bash
DICOMCapacitorService.exe --install --path "C:\CustomPath\DICOMCapacitor"
```

### Uninstall Service
Remove the Windows service:
```bash
DICOMCapacitorService.exe --uninstall
```
For more options, see [Command Line Options](/dicom-capacitor/command-line.md)
## Service Management

### Windows Service Controls
- Start: `net start DICOMCapacitorService`
- Stop: `net stop DICOMCapacitorService`
- Restart: `DICOMCapacitorService.exe --restart-service [ProcessID]`

### Service Components
During startup, the service initializes:
- Storage SCP (DICOM storage provider)
- Worklist SCP (DICOM worklist provider)
- Query/Retrieve SCP
- Storage Commitment SCP

### Initial Configuration
Configure core service behavior during installation:
```bash
# Disable Storage SCU
DICOMCapacitorService.exe --install --no-storage-scu

# Disable Worklist SCU
DICOMCapacitorService.exe --install --no-worklist-scu

# Disable file preparation
DICOMCapacitorService.exe --install --no-prepare
```

## Development Mode
Run in interactive console mode for testing:
1. Launch without installation flags
2. Service runs with console output
3. Press any key to terminate

## Logging
- Service logs: `[LogPath]/capacitor_service.log`
- Audit logs: `[LogPath]/capacitor_service_audit.log`

## Service Status Monitoring
Monitor service health through:
- Windows Event Viewer
- Service status in Windows Services
- Log files in configured log directory


## Docker Installation

Refer to the [Docker Operations](/dicom-capacitor/docker) page for instructions on how to run DICOM Capacitor in a Docker container.
