import React, { useEffect, useState } from "react";
import { UserApi } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Header, Button, ProgressBar, CenteredImage } from "../../../components";

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
            <ProgressBar progress="4/6" />
            <div className="place-items-center">
                <p className="text-center tk-text-teal text-3xl font-semibold pt-5">
                    Finally...
                </p>
                <p className="text-center tk-text-blue text-medium pt-8 px-8 h-32">
                    While in the listing platform, you can send a message
                    to the landlord to express your interest in the listing
                    and share your Turnkey link.
                </p>
                <div className="flex flex-col space-y-4 h-96"> 
                    <CenteredImage src="/assets/images/rental_url_share.png" className="w-screen h-full"></CenteredImage>
                    <CenteredImage src="/assets/images/default_user_icon.png" className="w-screen h-full"></CenteredImage>
                </div>
                <div className="flex flex-col gap-5 px-16 absolute w-screen bottom-4">
                    <Button variant="secondary" handleClick={() =>
                        router.push({
                            pathname: "/renter/walkthrough/5",
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