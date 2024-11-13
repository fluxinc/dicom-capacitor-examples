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

