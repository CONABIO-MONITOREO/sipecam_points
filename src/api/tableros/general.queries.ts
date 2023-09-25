import gql from 'graphql-tag';

/**
 * Visitas
 */
export const getVisits = gql`
  query visits($search: searchVisitInput, $order: [orderVisitInput], $pagination: paginationInput!) {
    visits(search: $search, order: $order, pagination: $pagination) {
      cumulus_visit {
        id
        name
        con_socio
        ecosystem_id
      }
      date_first_season
      date_second_season
      report_first_season
      report_second_season
    }
  }
`;

/**
 * Dispositivos
 */
export const getDevices = gql`
  query physical_devices(
    $search: searchPhysical_deviceInput
    $order: [orderPhysical_deviceInput]
    $pagination: paginationInput!
  ) {
    physical_devices(search: $search, order: $order, pagination: $pagination) {
      device {
        type
      }
      status
      cumulus_id
    }
  }
`;

/**
 *
 * Pequeños mamiferos
 */
export const getIndividuals = gql`
  query individuals($search: searchIndividualInput, $order: [orderIndividualInput], $pagination: paginationInput!) {
    individuals(search: $search, order: $order, pagination: $pagination) {
      associated_cumulus {
        id
        name
      }
    }
  }
`;

/**
 * Dispositivos desplegados
 */
export const getDeployments = gql`
  query deployments($search: searchDeploymentInput, $order: [orderDeploymentInput], $pagination: paginationInput!) {
    deployments(search: $search, order: $order, pagination: $pagination) {
      cumulus {
        id
        name
      }
      device {
        device {
          type
        }
      }
    }
  }
`;

/**
 * Transectos
 */
export const getTransects = gql`
  query transects($search: searchTransectInput, $order: [orderTransectInput], $pagination: paginationInput!) {
    transects(search: $search, order: $order, pagination: $pagination) {
      id
      associated_node {
        id
        nomenclatura
      }
    }
  }
`;

/**
 * Archivos
 */
export const getFiles = gql`
  query ecosystemFileCounts($ecosystem_id: ID!) {
    ecosystemFileCounts(ecosystem_id: $ecosystem_id) {
      file_count_ecosystem {
        delivery_date
        audio_files
        image_files
        video_files
        size
      }
    }
  }
`;

export const getAllFiles = gql`
  query file_counts($search: searchFile_countInput, $order: [orderFile_countInput], $pagination: paginationInput!) {
    file_counts(search: $search, order: $order, pagination: $pagination) {
      delivery_date
      audio_files
      image_files
      video_files
      size
    }
  }
`;

export const getCumulus = gql`
  query cumulus($search: searchCumulusInput, $order: [orderCumulusInput], $pagination: paginationInput!) {
    cumulus(search: $search, order: $order, pagination: $pagination) {
      id
      name
      ecosystem_id
    }
  }
`;

/**
 * KoboCounters
 */
export const getKoboCounters = gql`
  query get_kobo_counters($pagination: paginationInput!) {
    kobo_counters(pagination: $pagination) {
      id
      cumulus
      name
      value
      kobo_asset_uid
      kobo_asset_name
    }
  }
`;
