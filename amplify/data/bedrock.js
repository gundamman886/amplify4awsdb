export function request(ctx) {
    const { ingredients = [] } = ctx.args;

    // Construct the prompt with the provided ingredients
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

    // Return the request configuration for Jamba 1.5 Mini
    return {
      resourcePath: `/model/ai21.jamba-1-5-mini-v1:0/invoke`,
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          maxTokens: 1000,
          temperature: 0.7, // Adjusts creativity of the response
          topP: 1.0, // Controls diversity of the response
        }),
      },
    };
}

export function response(ctx) {
    // Parse the response body
    const parsedBody = JSON.parse(ctx.result.body);
    // Extract the text content from the response
    const res = {
      body: parsedBody.completions[0].data.text,
    };
    // Return the response
    return res;
}
