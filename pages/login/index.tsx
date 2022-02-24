import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { UserApi } from "../../generated-src/openapi";
import { Button, Header, Logo } from "../../components";

export default function Index() {
    const router = useRouter();
    let [
        [
            error,
            email,
            password
        ],
        setState,
    ] = useState([
        undefined,
        "",
        ""
    ]);
    const userApi = useMemo(() => new UserApi(), []);
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
    }, [router.isReady, router.query, userApi]);


    function login() {
        console.log(email, password)
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
                <p className="align-left tk-text-blue">Email:</p>
                <input
                    className="tk-border-blue border-2 rounded-xl p-2 w-full"
                    type="email"
                    onChange={($event) =>
                        setState([
                            error,
                            $event.target.value,
                            password,
                        ])
                    }
                    value={email}
                >
                </input>
                <p className="align-left tk-text-blue">Password:</p>
                <input
                    className="tk-border-blue border-2 rounded-xl p-2 w-full"
                    type="password"
                    onChange={($event) =>
                        setState([
                            error,
                            email,
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