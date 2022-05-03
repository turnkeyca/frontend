import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AuthenticationApi, RegisterTokenDto } from "../../generated-src/openapi";
import { Button, Header, Logo } from "../../components";

export default function Index() {
    const router = useRouter();
    let [
        [
            error,
            id,
            password
        ],
        setState,
    ] = useState([
        undefined,
        "",
        ""
    ]);
    const authApi = useMemo(() => new AuthenticationApi(), []);
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
    }, [router.isReady, router.query, authApi]);


    function login() {
        fetch("/api/secrets")
            .then(response => response.json())
            .then(data => {
                const body: RegisterTokenDto = {
                    id: id,
                    newUser: false,
                    secret: data.secret,
                }
                const obs = authApi.registerNewToken({ body }).subscribe({
                    next: (tk) => {
                        router.push({
                            pathname: "/renter",
                            query: { userId: tk.id, token: tk.token },
                        })
                    },
                    error: () => console.log(error)
                });

                return () => obs.unsubscribe();
            })
    }

    return (
        <div>
            <Header
                router={router}
                title="Login"
                showEdit={false}
                showBack={true}
                showLogout={false}
            ></Header>
            <div className="flex flex-col p-6 gap-4">
                <Logo src="../../assets/images/Turnkey_logo_colour.png"></Logo>
                <p className="align-left tk-text-blue">User name:</p>
                <input
                    className="tk-border-blue border-2 rounded-xl p-2 w-full"
                    type="id"
                    onChange={($event) =>
                        setState([
                            error,
                            $event.target.value,
                            password,
                        ])
                    }
                    value={id}
                >
                </input>
                <p className="align-left tk-text-blue">Password:</p>
                <input
                    className="tk-border-blue border-2 rounded-xl p-2 w-full"
                    type="password"
                    onChange={($event) =>
                        setState([
                            error,
                            id,
                            $event.target.value,
                        ])
                    }
                    value={password}
                >
                </input>

                <Button variant="secondary" handleClick={() => login()}>
                    Log In
                </Button>

                <div className="flex flex-col place-items-center gap-5">
                    <p className="uppercase tk-text-dark-grey text-center">
                        Forgot Username
                    </p>
                    <p className="uppercase tk-text-dark-grey text-center">
                        Forgot Password
                    </p>
                    <p className="uppercase tk-text-dark-grey text-center" onClick={() =>
                        router.push({
                            pathname: "/signup"
                        })}>
                        DON’T HAVE AN ACCOUNT? CLICK HERE TO SIGN UP</p>
                </div>
            </div>
        </div>)
}