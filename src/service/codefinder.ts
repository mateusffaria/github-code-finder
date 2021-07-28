import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: `${process.env.REACT_APP_GITHUB_DEV_KEY}`,
});
export type SearchResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.search.code
>;

async function sendRequest(
  searchCode: string,
  extensions: string,
  org: string
) {
  let fileExtensions: string[] = [];
  let organization: string[] = [];

  if (extensions.trim().length > 0)
    fileExtensions = extensions.trim().split(",");

  if (org.trim().length > 0) organization = org.trim().split(",");

  try {
    const data = await octokit.rest.search.code({
      q: prepateStatement(searchCode, fileExtensions, organization),
    });

    let grouped = Object.values(
      groupItemBy(data.data.items, "repository.name")
    ) as Array<SearchResponse["data"]["items"]>;

    return { grouped, total_count: data.data.total_count };
  } catch (error) {
    console.error(error);

    return { hasError: true, error };
  }
}

function groupItemBy(array: any, property: string) {
  var hash: any = {},
    props = property.split(".");
  for (var i = 0; i < array.length; i++) {
    var key = props.reduce(function (acc, prop) {
      return acc && acc[prop];
    }, array[i]);
    if (!hash[key]) hash[key] = [];
    hash[key].push(array[i]);
  }
  return hash;
}

function prepateStatement(
  searchCode: string,
  extensions: string[],
  org: string[]
) {
  let text = extensions.map((el) => {
    return `+language:${el.trim()}`;
  });

  org.forEach((el) => {
    text.push(`+org:${el}`);
  });

  let finalParams = text.toString().replaceAll(",", "");

  let query =
    finalParams.length > 0
      ? (finalParams = `${searchCode}+in:file${finalParams}`)
      : searchCode;

  return query;
}

export default sendRequest;
