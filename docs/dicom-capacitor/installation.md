# Installation

## Prerequisites

- Windows 10 or later, Windows Server 2016 or later, Linux or MacOS (x64 or arm64)
- .NET Core 8 or later
- 2 GB of RAM
- 1 GB of free disk space
- 2 GHz or faster, x64 or arm64, processor

## Installation

1. Download the latest version of DICOM Capacitor from the [Flux Website](#)
2. Run the installer
3. Open your Services MMC and start and stop the DICOM Capacitor service
4. Open the `%ProgramData%\Flux\DICOM Capacitor\` folder, which contains the following files
    - `cache/` - Contains the cache of DICOM data
    - `log/` - Contains the logs for DICOM Capacitor
        - `capacitor_service.log` - Contains the main log for DICOM Capacitor
    - `nodes.yml` - Specifies the nodes that DICOM Capacitor will use to send and receive DICOM data
    - `config.yml` - Specifies the settings for DICOM Capacitor

