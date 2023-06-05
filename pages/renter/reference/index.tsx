import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Error, Header, Footer, Icon, Warning } from "../../../components";
import { ReferenceApi } from "../../../generated-src/openapi";

export default function Reference(props) {
  const router = useRouter();
  let [[error, references, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  const referenceApi = useMemo(() => new ReferenceApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    let sub = referenceApi
      .getReferencesByUserId({
        userId: _userId,
        token: router.query.token as string,
      })
      .subscribe({
        next: (r) => setState([undefined, r, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, referenceApi]);
  return (
    <div>
      <Header
        router={router}
        title={props.header_text}
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Reference Info
          </span>
        </div>
        {references !== undefined && references.length === 0 && (
          <Warning>No reference records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {references?.map((reference) => (
            <div 
            key={reference.id} 
            className="p-3 border rounded shadow cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/renter/reference/view",
                query: { userId, token:router.query.token, referenceId: reference.id },
              })}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="tk-text-blue text-lg font-medium">
                    {reference.fullName}
                  </div>
                  <div className="tk-text-blue">{reference.email}</div>
                </div>
                <div className="flex tk-text-blue">
                  <Icon
                    name="edit"
                    handleClick={() =>
                      router.push({
                        pathname: "/renter/reference/edit",
                        query: { userId, token:router.query.token, referenceId: reference.id },
                      })
                    }
                  />
                  <Icon
                    className="mr-2"
                    name="delete"
                    handleClick={() =>
                      referenceApi
                        .deleteReference({
                          id: reference.id,
                          token: router.query.token as string,
                        })
                        .subscribe()
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/reference/edit",
                query: router.query,
              })
            }
            variant="primary"
          >
            <Icon name="add"></Icon> ADD REFERENCE
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}

Reference.defaultProps = {
  header_text: "My Profile",
  next_action_path: "/renter/reference/view"
}