import Image from 'next/image'
// pages/users.tsx
import useAxios from "axios-hooks";
import { AxiosError } from 'axios';

const spaceTradersApiUrl = "https://api.spacetraders.io/"

const HomePage = () => {
  //use the useAxios hook and pass the AxiosRequestConfig
  var isLoading: boolean = false
  var errorMsg: AxiosError<any, any> | null = null
  var responseData: any = null

  const makeRequest = (url: string) => {
    const [{ data, loading, error }] = useAxios<any>({
      baseURL: spaceTradersApiUrl,
      url: "v2/register",
    });
    isLoading = loading
    errorMsg = error
    responseData = data
  }
  return (
    <div>
      <h1>Home Page</h1>
      {isLoading && <p>Loading...</p>}
      {!!errorMsg && <p>{errorMsg.message}</p>}
      {!!responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
    </div>
  );
}

export default HomePage
