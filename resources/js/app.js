import {
    startAuthentication,
    startRegistration,
    browserSupportsWebAuthn,
} from '@simplewebauthn/browser';
import './bootstrap';

document.addEventListener('alpine:init', () => {
    Alpine.data('authForm', () => ({
        mode: 'login',
        username: '',
        browserSupported: browserSupportsWebAuthn(),
        error: null,
        submit() {
            this.error = null;

            if (this.mode === 'login') {
                return this.submitLogin();
            }

            return this.submitRegister();
        },
        submitRegister() {
            this.trackEvent('D5MKGI4J');

            window.axios
                // Ask for the registration options
                .post('/registration/options', {
                    username: this.username,
                })
                // Prompt the user to create a passkey
                .then((response) => startRegistration( response.data))
                .catch(error => console.error('Error in startRegistration:', error))
                // Verify the data with the server
                .then((attResp) =>{
                   
                    return axios.post('/registration/verify', attResp)
                } )
                .then((verificationResponse) => {
                    if (verificationResponse.data?.verified) {
                        // If we're good, reload the page and
                        // the server will redirect us to the dashboard
                        this.trackEvent('ME74WQE4');
                        return window.location.reload();
                    }

                    this.error =
                        'Something went wrong verifying the registration.';
                })
                .catch((error) => {
                    this.error = error?.response?.data?.message || error;
                });
        },
        submitLogin() {
            this.trackEvent('OHHWLXDF');

            window.axios
                // Ask for the authentication options
                .post('/authentication/options', {
                    username: this.username,
                })
                // Prompt the user to authenticate with their passkey
                .then((response) => startAuthentication(response.data))
                // Verify the data with the server
                .then((attResp) =>
                    axios.post('/authentication/verify', attResp),
                )
                .then((verificationResponse) => {
                    // If we're good, reload the page and
                    // the server will redirect us to the dashboard
                    if (verificationResponse.data?.verified) {
                        this.trackEvent('D7T81ZST');
                        return window.location.reload();
                    }

                    this.error =
                        'Something went wrong verifying the authentication.';
                })
                .catch((error) => {
                    const errorMessage =
                        error?.response?.data?.message || error;

                    if (errorMessage === 'User not found') {
                        this.mode = 'confirmRegistration';
                        return;
                    }

                    this.error = error?.response?.data?.message || error;
                });
        },
        trackEvent(eventId) {
            if (typeof fathom === 'undefined') {
                return;
            }

            fathom.trackGoal(eventId, 0);
        },
    }));
});