# Docker Operation

Capacitor can be run as a Docker container. 

## Docker Compose

A basic Docker Compose file appears below:

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
