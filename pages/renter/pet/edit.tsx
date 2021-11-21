import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Error,
  Footer,
  Header,
  Label,
  NToggle,
  TextInput,
  Toggle,
} from "../../../components";
import { PetApi, PetDto } from "../../../generated-src/openapi";

export default function Pet() {
  const router = useRouter();
  let [
    [
      error,
      pet,
      breed,
      petType,
      sizeType,
      petId,
    ],
    setState,
  ] = useState([undefined, undefined, undefined, undefined, undefined, undefined]);
  const petApi = useMemo(() => new PetApi(), []);
  let userId = useRef("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    userId.current = _userId;
    let _petId = router.query.petId as string;
    if (!_petId) {
      return;
    }
    const sub = petApi
      .getPet({
        id: _petId,
        token: router.query.token as string,
      })
      .subscribe({
        next: (p) =>
          setState([
            undefined,
            p,
            p.breed,
            p.petType,
            p.sizeType,
            _petId,
          ]),
        error: (e) => setState([e, undefined, undefined, undefined, undefined, _petId]),
      });
    return () => sub.unsubscribe();
  }, [
    router.isReady,
    router.query.petId,
    petApi,
  ]);

  function save() {
    let obs: Observable<void>;
    let body = pet;
    body.breed = breed;
    body.petType = petType;
    body.sizeType = sizeType;
    if (petId) {
      obs = petApi.updatePet({
        id: petId,
        body,
        token: router.query.token as string,
      });
    } else {
      obs = petApi.createPet({
        body,
        token: router.query.token as string,
      });
    }

    obs.subscribe(() =>
      router.push({
        pathname: "/renter/pet",
        query: { userId: router.query.userId },
      })
    );
  }

  return (
    <div>
      <Header
        router={router}
        title="My Profile"
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Pet info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Pet type</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  pet,
                  breed,
                  $event.target.value,
                  sizeType,
                  petId,
                ])
              }
              value={petType}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Breed</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  pet,
                  $event.target.value,
                  petType,
                  sizeType,
                  petId,
                ])
              }
              value={breed}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Length of current pet</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  pet,
                  breed,
                  petType,
                  $event.target.value,
                  petId,
                ])
              }
              value={sizeType}
            />
          </div>
          <Button variant="secondary" handleClick={() => save()}>
            NEXT
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
