import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { UserApi, UserDto } from "../../generated-src/openapi";
import { Button, Header, Logo, Toggle } from "../../components";


export default function Index() {
    const router = useRouter();
    const userApi = new UserApi();
    // Sign in variables
    let [[
        error,
        userType
    ],
        setState,
    ] = useState([
        undefined,
        true
    ]);
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
    }, [router.isReady, router.query]);


    function procede() {
        let user_id = router.query.userId as string
        let token = router.query.token as string
        const sub = userApi
            .getUser({ id: user_id, token: token })
            .subscribe({
                next: (u) => {
                    console.log(u)
                    if (userType) {
                        // Update user type
                        u.userType = "renter"
                        console.log(u)

                        userApi.updateUser({ id: user_id, token: token, body: u as UserDto }).subscribe({
                            next: () => {
                                // move to next stage
                                router.push({
                                    pathname: "/signup/profileBuild",
                                    query: { userId: user_id, token: token },
                                })
                            },
                            error: (e) => {
                                console.log(e)
                                setState([e, userType])
                            }
                        })
                    }
                    else {
                        // Update user type
                        u.userType = "landlord"
                        console.log(u)

                        userApi.updateUser({ id: user_id, token: token, body: u as UserDto }).subscribe({
                            next: () => {
                                // move to next stage
                                router.push({
                                    pathname: "/signup/profileBuild",
                                    query: { userId: user_id, token: token },
                                })
                            },
                            error: (e) => {
                                console.log(e)
                                setState([e, userType])
                            }
                        })
                    }
                },
                error: (e) => setState([e, userType]),
            });
        return () => sub.unsubscribe();
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

                {/* <p className="align-left tk-text-blue">Are you a renter or a landlord?</p> */}
                {/* Hold id values and update the state */}
                {/* <Toggle
                    labelFalse="Landlord"
                    labelTrue="Renter"
                    handleChange={($event) =>
                        setState([
                            error,
                            $event.target.value === "true",
                        ])
                    }
                    value={userType}
                /> */}

                <Button variant="secondary" handleClick={() => procede()}>
                    Make Renter Profile
                </Button>
            </div>
        </div>)
}