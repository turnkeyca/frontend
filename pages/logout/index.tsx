import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { AuthenticationApi, RegisterTokenDto, UserApi } from "../../generated-src/openapi";
import { FloatingDialogue, Button, CenteredImage } from "../../components";

export default function Index() {
    const router = useRouter();
    let [[
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

    function logout() {
        router.push("/")
    }

    function goBack() {
        let _userId = router.query.userId as string;
        const userApi = new UserApi();
        const sub = userApi
            .getUser({ id: _userId, token: router.query.token as string })
            .subscribe({
                next: (u) => {
                    console.log(u)
                    if (u.userType === "renter") {
                        router.push({
                            pathname: "/renter",
                            query: router.query,
                        })
                    }
                    else if (u.userType === "landlord") {
                        router.push({
                            pathname: "/landlord",
                            query: router.query,
                        })
                    }
                    else {
                        logout();
                    }
                },
                error: (e) => console.log(e),
            });
        return () => sub.unsubscribe();
    }

    return (
        <div>
            <FloatingDialogue>
                <div>
                    <Image
                        className="justify-self-center"
                        src="/android-chrome-192x192.png"
                        alt="logo"
                        layout='fixed'
                        height='65%'
                        width='65%'
                    >
                    </Image>
                </div>
                <h1 className="place-self-center">Are you sure you want to log out?</h1>
                <div className="grid grid-cols-2 gap-10">
                    <Button variant="quatrenary" handleClick={() => goBack()}>Go Back</Button>
                    <Button  handleClick={() => logout()}>Log Out</Button>
                </div>
            </FloatingDialogue>
        </div>)
}