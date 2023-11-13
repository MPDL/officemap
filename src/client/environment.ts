export const environmentVariables: EnvironmentVariables = {
    version: process.env.VERSION ?? '0',
    api_base_url: process.env.API_BASE_URL ?? '',
    api_url_path: process.env.API_URL_PATH ?? '',
    api_port: process.env.API_PORT ?? '',
    webpack_mode: process.env.NODE_ENV ?? '',
}

interface EnvironmentVariables {
    version: string,
    api_base_url: string,
    api_url_path: string,
    api_port: string,
    webpack_mode: string
}