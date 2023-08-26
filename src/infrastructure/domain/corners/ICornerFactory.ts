import { Wall } from "../walls/Wall";
import {
  RightBottomCorner,
  RightTopCorner,
  LeftBottomCorner,
  LeftTopCorner,
  Corner,
} from "./Corner";

export abstract class ICornerFactory {
  protected abstract createRightTopCorner(x: number, y: number): RightTopCorner;
  protected abstract createLeftTopCorner(x: number, y: number): LeftTopCorner;
  protected abstract createRightBottomCorner(
    x: number,
    y: number
  ): RightBottomCorner;
  protected abstract createLeftBottomCorner(
    x: number,
    y: number
  ): LeftBottomCorner;

  public create(wall: Wall, nextWall: Wall): Corner | null {
    if (
      wall.reflectDirection === "left" &&
      nextWall.reflectDirection === "bottom" &&
      nextWall.isLeftWard()
    ) {
      /* 
        右上
      */

      return this.createRightTopCorner(wall.xs()[1], wall.ys()[1]);
    }

    if (
      wall.reflectDirection === "right" &&
      nextWall.reflectDirection === "top" &&
      nextWall.isRightWard()
    ) {
      return this.createLeftBottomCorner(wall.xs()[1], wall.ys()[1]);
    }

    if (
      wall.reflectDirection === "bottom" &&
      nextWall.reflectDirection === "right" &&
      nextWall.isDownWard()
    ) {
      return this.createLeftTopCorner(wall.xs()[1], wall.ys()[1]);
    }

    if (
      wall.reflectDirection === "top" &&
      nextWall.reflectDirection === "left" &&
      nextWall.isUpWard()
    ) {
      return this.createRightBottomCorner(wall.xs()[1], wall.ys()[1]);
    }

    return null;
  }
}
