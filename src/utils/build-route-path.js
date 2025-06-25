export function builRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-]+)');
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`); // ?<query> é um grupo nomeado que captura a query parameter

    return pathRegex;
}