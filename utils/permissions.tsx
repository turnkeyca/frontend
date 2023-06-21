import { PermissionApi, UserApi } from "../generated-src/openapi";

export function checkPermissions(router, canViewFunc, canEditFunc, setStateFunc) {
    if (!router.isReady) {
        return;
    }
    let _userId = router.query.userId as string;
    const permissionApi = new PermissionApi();
    const perms = permissionApi
        .getPermissionsByUserId({ userId: _userId, token: router.query.token as string })
        .subscribe({
            next: (permList) => {
                permList.forEach(element => {
                    if (element['onUserId'] == _userId) {
                        console.log(element)
                        if (element['permission'] == "view") {
                            canViewFunc(true)
                            console.log(`Can View`)
                        }
                        else if (element['permission'] == "edit") {
                            canEditFunc(true)
                            console.log(`Can Edit`)
                        }
                    }
                });
            },
            error: (e) => setStateFunc([e, undefined, undefined])
        })
    return () => perms.unsubscribe();
}