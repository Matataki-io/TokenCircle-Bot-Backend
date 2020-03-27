export function maskEmailAddress(str: string) {
    // Source: https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
    const regex = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+)@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const match = regex.exec(str);

    if (!match) {
        return str;
    }

    let username = match[1];
    const rest = str.slice(username.length);

    switch (username.length) {
        case 1:
            username = '*';
            break;

        case 2:
            username = username[0] + '*';
            break;

        case 3:
            username = username[0] + '*' + username[2];
            break;

        default:
            const trunkSize = username.length / 4;
            const firstSize = Math.max(Math.floor(trunkSize), 1);
            const secondSize = Math.ceil(trunkSize * 2);
            username = username.slice(0, firstSize) + '*'.repeat(secondSize) + username.slice(firstSize + secondSize);
            break;
    }

    return username + rest;
}
