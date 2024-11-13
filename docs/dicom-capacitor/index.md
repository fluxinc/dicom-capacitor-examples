# DICOM Capacitor by Flux Inc

## Copyright

DICOM Capacitor is a product of Flux Inc.  All rights reserved.

## License

Unless superseded by another agreement, your use of this software is governed by the "DICOM Capacitor End User License 
Agreement" contained in the  `LICENSE.md` file included with this software.  By using this software, you agree to be 
bound by the terms of this agreement.

## Introduction

Capacitor is a DICOM store-forward router that can be used to route DICOM images from a source to a destination.  It
is designed to be used in a clinical setting where a DICOM modality (e.g. a CT scanner) needs to send images to a
PACS (Picture Archiving and Communication System) but the network is not reliable, compression is required, or the user
wishes to make changes to either inbound or outbound images and data.

Capacitor listens for and relays C-ECHO, C-STORE, and C-FIND requests and responses, as well as C-MOVE requests,
storage commitment, and other DICOM services.  It can also be configured to anonymize, compress, and encrypt images.

## General Features

- **Store-Forward**: Stores and forwards DICOM images from a source to a destination.
- **Compression**: Compresses DICOM images using JPEG or JPEG2000.
- **Anonymization**: Anonymizes DICOM images by removing or replacing identifying information.
- **Encryption**: Encrypts DICOM images using AES-256.
- **Routing**: Routes DICOM images to different destinations based on configurable criteria.
- **Mutations**: Applies mutations to DICOM images based on configurable criteria.
- **Sorting**: Sorts DICOM images based on configurable criteria.
- **Storage Commitment**: Sends and receives DICOM storage commitment requests.
- **Worklist**: Queries, caches, and manipulates DICOM worklist data.
- **Query/Retrieve**: Queries and retrieves DICOM images from a remote node.

Capacitor is designed to be:

- **Reliable**: Capacitor is designed to be reliable and robust, and can handle large volumes of DICOM data.
- **Scalable**: Capacitor can be used to route DICOM data to multiple destinations, and scales to use available memory
     and CPU resources.
- **Flexible**: Can be configured to route, compress, anonymize, encrypt, and manipulate DICOM data in a
  variety of ways.

## Technical Features

- **Multithreaded**: Multiple threads process DICOM data.
- **Stateless**: Stops and starts without losing data.
- **Fault-tolerant**: Recovers from errors and network outages.
- **Secure**: Uses encryption both at rest and in transit.

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

## Docker Compose

Capacitor can be run as a Docker container. A basic Docker Compose file appears below:

```yaml
# compose.yaml
services:
  capacitor:
    image: fluxinc/dicom-capacitor:latest
    ports:
      - "104:1040"
    environment:
      DOTNET_SYSTEM_GLOBALIZATION_INVARIANT: false
    volumes:
      - ./data:/data
      - ./cache:/cache
      - /var/run/docker.sock:/var/run/docker.sock
```

This document will assume you're using the Windows-specific installer and binaries. Please contact us to learn more
about other installation methods and platforms.


### Command Line Options

The following command line options are available:

- `--path`: Sets the path to the configuration files (default: `%ProgramData%\Flux\DICOM Capacitor\`)
- `--no-storage-scu`: Disables the Storage SCU
- `--no-worklist-scu`: Disables the Worklist SCU
- `--no-prepare`: Disables preparation, which is the process of preparing files for storage
- `--save-config`: Saves the current settings to the `config.yml` file.  Be careful with this option, as it
  will overwrite the existing `config.yml` file.
- `--mutate`: Applies the mutations defined in `mutations.yml`. This option requires a list of
  DICOM files to be provided, and is intended for testing purposes.


### Manipulating the Cache

The cache directory is located at `%ProgramData%\Flux\DICOM Capacitor\cache`.  This directory contains all of the DICOM
data that has been received and currently being processed by DICOM Capacitor.

In designing Capacitor we have made every effort to ensure that it can handle manual manipulation of the cache.  This
means that you can move or delete files from the cache without causing any issues.  Please note that doing so may
cause Capacitor to abort any currently pending operations on the affected files, and output errors or warnings to the
log file.

The cache directory contains the following subdirectories:

- `new/`: Contains incoming unprocessed DICOM data
- `prepared/`: Contains DICOM data that has been prepared for storage
- `receipts/`: Contains Storage Commitment receipts, which are used to confirm that data has been stored
- `logs/`: Contains individual instance logs named:
  `/{YEAR}/{MONTH}/{DAY}/{DESTINATION_AE}/{SOURCE_AE}/{SOP}_{INSTANCE_UID}.log`
  These logs are automatically deleted after `config.yml/daysToKeepLogs` days.
- `pendingneventreportrequest/`: Contains pending N-EVENT-REPORT requests for Storage Commitment
- `rejected/`: Contains DICOM data that has been rejected by recipient nodes
- `expired/`: Contains DICOM data that has expired as per the `config.yml/expiryThreshold` setting
- `failed/`: Contains DICOM data that has failed to be stored for some unexpected reason

### Interrogating the Logs

DICOM Capacitor logs are stored in the `%ProgramData%\Flux\DICOM Capacitor\log` directory.  The main log file is
`capacitor_service.log`.  This file contains a detailed log of all operations performed by DICOM Capacitor.

We recommend using a log viewer such as TailBlazer or BareTail to view the logs in real-time.

## Uninstallation

To uninstall the complete DICOM Capacitor application, follow these steps:

1. Open Add/Remove Programs (Start - Run - `appwiz.cpl`)
2. Locate DICOM Capacitor in the list of installed programs
3. Click `Uninstall`

Alternatively, you can use the `sc` command-line tool to uninstall the service:

```cmd
sc delete "DICOMCapacitorService"
```

## Upgrading

To upgrade DICOM Capacitor, run the installer for the new version.  The installer will automatically stop the service,
upgrade the files, and restart the service.  We design our installers to be as seamless as possible, so you should
not need to make any changes to your configuration files.

Because Capacitor is semi-stateless, it is possible to upgrade from any version to any other version without losing
data.  Capacitor will automatically pick up where it left off, and continue processing data as before.

## Support

If you have any questions or need assistance, please contact Flux Inc at:

Web. https://fluxinc.co/support
Phone. +1 (470) 890-1007
Email. support@fluxinc.co

## License

DICOM Capacitor is licensed under the Flux Inc. End User License Agreement.
Please see the `LICENSE.md` file for more information and licenses for included libraries.
