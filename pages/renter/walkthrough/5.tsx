import React, { useEffect, useState } from "react";
import { UserApi } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Header, Button, ProgressBar } from "../../../components";

export default function RenterWalkthrough1() {
    const router = useRouter();
    let [[error, user, userId], setState] = useState([
        undefined,
        undefined,
        undefined,
    ]);
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        let _userId = router.query.userId as string;
        const userApi = new UserApi();
        const sub = userApi
            .getUser({ id: _userId, token: router.query.token as string })
            .subscribe({
                next: (u) => setState([undefined, u, _userId]),
                error: (e) => setState([e, undefined, _userId]),
            });
        return () => sub.unsubscribe();
    }, [router.isReady, router.query]);
    return (
        <div>
            <Header
                router={router}
                title="My Turnkey"
                showEdit={false}
                showBack={false}
                showLogout={false}
            />
            <ProgressBar progress="5/6" />
            <div className="place-items-center">
                <p className="text-center tk-text-teal text-3xl font-semibold pt-5">
                    Oh, and one more thing...
                </p>
                <p className="text-center tk-text-blue text-medium p-8">
                    When a landlord opens your Turnkey profile for the first time, 
                    they will send you a request to view it...
                </p>
                <img></img>
                <div className="flex flex-col gap-5 px-16">
                    <Button variant="secondary" handleClick={() =>
                        router.push({
                            pathname: "/renter/walkthrough/6",
                            query: { userId, token: router.query.token },
                        })}
                    >Next</Button>
                    <Button variant="tertiary" handleClick={() =>
                        router.push({
                            pathname: "/renter",
                            query: { userId, token: router.query.token },
                        })}
                    >Skip Demo</Button>
                </div>
            </div>
        </div>
    );
}