# Command Line Options

Capacitor accepts the following command line options:

- `--path`: Sets the path to the configuration files (default: `%ProgramData%\Flux\DICOM Capacitor\`)
- `--no-storage-scu`: Disables the Storage SCU
- `--no-worklist-scu`: Disables the Worklist SCU
- `--no-prepare`: Disables preparation, which is the process of preparing files for storage
- `--save-config`: Saves the current settings to the `config.yml` file.  Be careful with this option, as it
  will overwrite the existing `config.yml` file.
- `--mutate`: Applies the mutations defined in `mutations.yml`. This option requires a list of
  DICOM files to be provided, and is intended for testing purposes.
