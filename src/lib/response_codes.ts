import { NextResponse } from "next/server";

type FieldErrors = {
  [key: string]: string[];
};

type ResponseBody = {
  errors?: FieldErrors;
  title: string;
  description: string;
};

/**
 * Generates a 200 OK response.
 *
 * @param responseBody Optional response body containing title and description.
 * @returns NextResponse with status 200.
 */
export function status200(responseBody?: ResponseBody): NextResponse {
  return NextResponse.json(
    {
      title: responseBody?.title ?? "Success",
      description:
        responseBody?.description ?? "Request succeeded and fulfilled.",
    },
    { status: 200 }
  );
}

/**
 * Generates a 201 Created response.
 *
 * @param responseBody Optional response body containing title and description.
 * @returns NextResponse with status 201.
 */
export function status201(responseBody?: ResponseBody): NextResponse {
  return NextResponse.json(
    {
      title: responseBody?.title ?? "Created",
      description:
        responseBody?.description ??
        "Request succeeded and a new resource was successfully created.",
    },
    { status: 201 }
  );
}

/**
 * Generates a 400 Bad Request response.
 *
 * @param responseBody Optional response body containing errors, title, and description.
 * @returns NextResponse with status 400.
 */
export function status400(responseBody?: ResponseBody): NextResponse {
  return NextResponse.json(
    {
      errors: responseBody?.errors ?? null,
      title: responseBody?.title ?? "Bad Request",
      description:
        responseBody?.description ?? "Request body contained invalid data.",
    },
    { status: 400 }
  );
}

/**
 * Generates a 401 Unauthorized response.
 *
 * @param responseBody Optional response body containing title and description.
 * @returns NextResponse with status 401.
 */
export function status401(responseBody?: ResponseBody): NextResponse {
  return NextResponse.json(
    {
      title: responseBody?.title ?? "Unauthorized",
      description:
        responseBody?.description ??
        "You need to be logged in to access the requested content.",
    },
    { status: 401 }
  );
}

/**
 * Generates a 403 Access Denied response.
 *
 * @param responseBody Optional response body containing title and description.
 * @returns NextResponse with status 403.
 */
export function status403(responseBody?: ResponseBody): NextResponse {
  return NextResponse.json(
    {
      title: responseBody?.title ?? "Access Denied",
      description:
        responseBody?.description ??
        "You do not have access to the requested content.",
    },
    { status: 403 }
  );
}

/**
 * Generates a 500 Internal Server Error response.
 *
 * @returns NextResponse with status 500.
 */
export function status500(): NextResponse {
  return NextResponse.json(
    {
      title: "Internal Server Error",
      description: "Something went wrong on our end. Please try again later.",
    },
    { status: 500 }
  );
}

/**
 * Generates a 501 Not Implemented response.
 *
 * @returns NextResponse with status 501.
 */
export function status501(): NextResponse {
  return NextResponse.json(
    {
      title: "Not Implemented",
      description: "The requested content has not been implemented yet.",
    },
    { status: 501 }
  );
}
