import {
    Body,
    Controller,
    Extension,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { User } from "./user";
  import { UserService, UserCreationParams } from "./userService";

  @Route("users")
  export class UserController extends Controller {
    @Get("{userId}")
    public async getUser(
      @Path() userId: number,
      @Query() name?: string
    ): Promise<User> {
      return new UserService().get(userId, name);
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Body() requestBody: UserCreationParams
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new UserService().create(requestBody);
      return;
    }

    @Get("/secret/{userId}")
    @Extension('x-internal','true')
    public async getSecretOperation(
      @Path() userId: number,
      @Query() name?: string
    ): Promise<User> {
      return new UserService().get(userId, name);
    }
  }