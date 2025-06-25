export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce(() => {
        const [] = param.split('=');

        queryParams[key] = value;

        return queryParams;
    }, {});
}