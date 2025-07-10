import swaggerAutogen from "swagger-autogen";

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "RemindMe API",
    version: "1.0.0",
    description: "",
  },
  servers: [
    {
      url: "http://localhost:7000",
    },
  ],
  components: {
    schemas: {
      CategoryRequest: {
        $name: "Alimentação",
      },
      CategoryResponse: {
        id: 1,
        name: "Alimentação",
      },
      CategoryListResponse: {
        categories: [
          {
            id: 1,
            name: "Alimentação",
          },
        ],
      },
      Error: {
        status: 400,
        message:
          "\nInvalid `prisma.course.create()` invocation:\n\n\nUnique constraint failed on the constraint: `courses_name_key`",
        details: {
          code: "P2002",
          meta: {
            modelName: "Category",
            target: "categories_name_key",
          },
          clientVersion: "6.7.0",
          name: "PrismaClientKnownRequestError",
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, swaggerConfig).then(
  async () => {
    await import("./src/index");
  }
);
