# Upgrading

To upgrade DICOM Capacitor, run the installer for the new version.  The installer will automatically stop the service, upgrade the files, and restart the service.  We design our installers to be as seamless as possible, so you should not need to make any changes to your configuration files.

Because Capacitor is semi-stateless, it is possible to upgrade from any version to any other version without losing data.  Capacitor will automatically pick up where it left off, and continue processing data as before.

## Upgrading Docker Installations

To upgrade a docker installation simply run the following command:

```bash
docker pull fluxinc/dicom-capacitor:latest
```

This will pull the latest version of the docker image and update the container to the latest version.

For docker compose instances, run the following command:

```bash
docker compose pull
docker compose up -d
```

This will pull the latest version of the docker image, update the container to the latest version, and restart the container.
