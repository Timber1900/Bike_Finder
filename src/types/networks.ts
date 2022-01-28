export interface Networks {
  networks: Network[];
}

export interface Network {
  company:    string[] | null | string;
  href:       string;
  id:         string;
  location:   Location;
  name:       string;
  source?:    string;
  gbfs_href?: string;
  license?:   License;
}

export interface License {
  name: Name;
  url:  string;
}

export enum Name {
  DataLicenceGermanyAttributionVersion20 = "Data licence Germany – attribution – version 2.0",
  OGLV3License = "OGL v3 license",
  OpenDataCommonsOpenDatabaseLicense10ODBL = "Open Data Commons Open Database License 1.0 (ODbL)",
  OpenLicence = "Open Licence",
}

export interface Location {
  city:      string;
  country:   string;
  latitude:  number;
  longitude: number;
}

