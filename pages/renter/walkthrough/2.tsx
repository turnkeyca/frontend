import React, { useEffect, useState } from "react";
import { UserApi } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Header, Button, ProgressBar, CenterdImage } from "../../../components";
import Lottie from 'react-lottie';
import * as animationData from "../../assets/lotties/pulse-selector.json";

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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRation: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Header
                router={router}
                title="My Turnkey"
                showEdit={false}
                showBack={false}
                showLogout={false}
            />
            <ProgressBar progress="2/6" />
            <Lottie options={defaultOptions} height={100} width={100}/>
            <div className="place-items-center">
                <p className="text-center tk-text-teal text-3xl font-semibold pt-5">Next...</p>
                <p className="text-center tk-text-blue text-medium p-8">Search for listings
                on your preferred listing platform.</p>
                <CenterdImage src="../../assets/images/renter_profile.png" alt="renter profile"></CenterdImage>
                <div className="flex flex-col gap-5 px-16">
                    <Button variant="secondary" handleClick={() =>
                        router.push({
                            pathname: "/renter/walkthrough/3",
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