import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Footer, Header, Label } from "../../../components";
import { PetApi, PetDto } from "../../../generated-src/openapi";

export default function Pet() {
  const router = useRouter();
  let [[error, pet], setState] = useState([undefined, undefined]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _petId = router.query.petId as string;
    const petApi = new PetApi();
    const sub = petApi
      .getPet({
        id: _petId,
        token: router.query.token as string,
      })
      .subscribe({
        next: (p) => setState([undefined, p]),
        error: (e) => setState([e, undefined]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query.petId]);
  return (
    <div>
      <Header
        router={router}
        title="My Profile"
        showEdit={true}
        showBack={true}
        showLogout={false}
        editSamePath={true}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Pet Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Breed</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {pet?.breed}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Occupation</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {pet?.occupation}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Pet type</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {pet?.petType}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Size</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {pet?.sizeType}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
