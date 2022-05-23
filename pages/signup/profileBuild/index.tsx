import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AuthenticationApi, UserApi, UserDto } from "../../../generated-src/openapi";
import { Button, Header, Logo } from "../../../components";


export default function Index() {
    const router = useRouter();
    const userApi = new UserApi();
    // Sign in variables
    let [[
        error,
        fullName,
        nickname
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


    function procede() {
        let user_id = router.query.userId as string
        let token = router.query.token as string
        const sub = userApi
            .getUser({ id: user_id, token: token })
            .subscribe({
                next: (u) => {
                    console.log(u)
                    // Update user type
                    u.fullName = fullName
                    u.nickname = nickname
                    console.log(u)

                    userApi.updateUser({ id: user_id, token: token, body: u as UserDto }).subscribe({
                        next: () => {
                            // move to next stage
                            router.push({
                                pathname: "/signup/profileBuild/2",
                                query: { userId: user_id, token: token },
                            })
                        },
                        error: (e) => {
                            console.log(e)
                            setState([e, fullName, nickname])
                        }
                    })
                }
            })
    }

    return (
        <div>
            <Header
                router={router}
                title="Sign Up"
                showEdit={false}
                showBack={true}
                showLogout={false}
            ></Header>
            <div className="flex flex-col p-6 gap-4">
                <Logo src="../../assets/images/Turnkey_logo_colour.png"></Logo>
                <p className="tk-red-required">* required</p>
                <p className="align-left tk-text-blue">Full name*</p>
                <input
                    className="tk-border-blue border-2 rounded-xl p-2 w-full"
                    type="text"
                    required={true}
                    placeholder="Cameron Doe"
                    onChange={($event) =>
                        setState([
                            error,
                            $event.target.value,
                            nickname,
                        ])
                    }
                    value={fullName}
                >
                </input>

                <p className="align-left tk-text-blue">What shall we call you?*</p>
                <input
                    className="tk-border-blue border-2 rounded-xl p-2 w-full"
                    type="text"
                    required={true}
                    placeholder="Cam"
                    onChange={($event) =>
                        setState([
                            error,
                            fullName,
                            $event.target.value,
                        ])
                    }
                    value={nickname}
                >
                </input>

                <Button variant="secondary" handleClick={() => procede()}>
                    Next
                </Button>
            </div>
        </div>)
}