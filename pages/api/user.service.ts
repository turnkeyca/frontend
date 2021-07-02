import { UserApi, UserDto } from "../../generated-src/openapi";
import { Observable } from "rxjs";

function getUser(id: string): Observable<UserDto> {
  let userApi = new UserApi();
  return userApi.getUser({ id });
}
