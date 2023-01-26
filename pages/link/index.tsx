import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AuthenticationApi, RegisterTokenDto, UserApi } from "../../generated-src/openapi";
import { Button, Header, Logo } from "../../components";

export default function Index() {
    const router = useRouter();

    return (
        <div>
            <Header
                router={router}
                title="Paste Link"
                showEdit={false}
                showBack={false}
                showLogout={false}
            ></Header>
            <div className="flex flex-col p-6 gap-4">
                <img className="w-11/12 mx-auto"
                    src="../assets/images/Turnkey_logo_reverse.png"
                    alt="turnkey_logo">
                </img>
                <p>A renter has sent you their Turnkey profile application.</p>

                <Button variant="secondary" handleClick={() => router.push}>
                    SIGN IN TO VIEW
                </Button>
            </div>
        </div>)
}