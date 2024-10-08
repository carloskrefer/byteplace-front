const backendUrl = "http://localhost:8080";

export const constants = {
    backend: {
        endpoints: {
            register: `${backendUrl}/auth/register`,
            authenticate: `${backendUrl}/auth/authenticate`
        }
    }

}
