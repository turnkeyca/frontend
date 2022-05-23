import React, { useEffect, useState } from "react";
import { UpdateUserRequest, UserApi, UserDto } from "../../../generated-src/openapi";
import { Observable } from "rxjs";
import { useRouter } from "next/router";
import { Header, Button, ProgressBar, CenteredImage, PulseLottie } from "../../../components";

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

    function completeWalkthrough() {
        const userApi = new UserApi();
        user.walkthroughComplete = true;

        let obs: Observable<void>;
        let body = user as UserDto;

        const updateRequest = {
            id: router.query.userId as string,
            token: router.query.token as string,
            body: body
        } as UpdateUserRequest;
        
        obs = userApi.updateUser(updateRequest);

        obs.subscribe(() =>
            router.push({
                pathname: "/renter",
                query: { userId: router.query.userId, token: router.query.token },
            })
        );
    }

    return (
        <div>
            <Header
                router={router}
                title="My Turnkey"
                showEdit={false}
                showBack={false}
                showLogout={false}
            />
            <ProgressBar progress="full" />
            <div className="place-items-center">
                <p className="text-center tk-text-teal text-3xl font-semibold pt-5">
                    So...
                </p>
                <p className="text-center tk-text-blue text-medium pt-8 px-8 h-32">
                    Don't forget to accept their request to view your profile!
                </p>
                <div className="static h-96">
                    <CenteredImage className="w-screen h-full" src="/assets/images/view_requests.png" alt="renter profile"></CenteredImage>
                    <PulseLottie left={200} top={525} width={50} height={50} />
                </div>
                <div className="flex flex-col gap-5 px-16 absolute w-screen bottom-20">
                    <Button variant="secondary" handleClick={() => completeWalkthrough()}>Get Started!</Button>
                </div>
            </div>
        </div>
    );
}