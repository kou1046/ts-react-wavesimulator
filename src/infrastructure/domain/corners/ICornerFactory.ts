import { Wall } from "../walls/Wall";
import { Corner } from "./Corner";

export abstract class ICornerFactory {
  abstract create(wall1: Wall, wall2: Wall): Corner;
}
