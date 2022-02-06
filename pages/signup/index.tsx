import React from "react";
import { useRouter } from "next/router";
import { Button, Header, TextField } from "../../components";

// function login(router, email, password) {

//     router.push({
//         pathname: "/renter"
//         query: { userId, token: router.query.token },
//     })
// }

// handleClick={() => login()}

export default function Index() {
    const router = useRouter();
    return (
        <div>
            <Header
                router={router}
                title="Signup"
                showEdit={false}
                showBack={true}
                showLogout={false}
            ></Header>
            <div className="flex flex-col p-6 gap-4">
                <p className="align-left tk-text-blue">Email:</p>
                <TextField type="email"></TextField>
                <p className="align-left tk-text-blue">Password:</p>
                <TextField type="password"></TextField>

                <Button variant="secondary">
                    Next
                </Button>

                <div className="flex flex-col place-items-center">
                <p className="uppercase tk-text-dark-grey text-center" onClick={() =>
                    router.push({
                        pathname: "/login"
                    })}>
                    ALREADY HAVE AN ACCOUNT? CLICK HERE TO LOG IN</p>
                    </div>
            </div>
        </div>)
}