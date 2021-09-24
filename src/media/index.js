import { Router } from "express";
import uniqid from "uniqid";
import { mediaValidationMiddleware } from "./validation.js";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { readMedia, writeMedia } from "../utils/media.js";

const mediaRoute = Router();

mediaRoute.post("/", mediaValidationMiddleware, async (req, res, next) => {
  const errorList = validationResult(req);
  try {
    if (!errorList.isEmpty()) {
      next(createHttpError(400));
    } else {
      const newMedia = { imdbID: uniqid(), ...req.body };
      const media = await readMedia();
      media.push(newMedia);
      await writeMedia(media);
      res.status(201).send({ imdbID: newMedia.imdbID, ...newMedia });
    }
  } catch (error) {
    next(error);
  }
});
mediaRoute.get("/", async (req, res, next) => {
  try {
    const media = await readMedia();
    res.status(200).send(media);
  } catch (error) {
    next(error);
  }
});
mediaRoute.get("/:mediaId", async (req, res, next) => {
  try {
    const media = await readMedia();
    const mediaa = media.find(m => m.imdbID === req.params.mediaId);
    if (mediaa) {
      res.send(mediaa);
    } else {
      res.status(404).send("Media not found!");
    }
  } catch (error) {
    next(error);
  }
});
mediaRoute.put("/:mediaId", async (req, res, next) => {
  try {
    const media = await readMedia();
    const index = media.findIndex((m) => m.imdbID === req.params.mediaId);
    const mediaToModify = media[index];
    const updatedMedia = req.body;
    const modifiedMedia = { ...mediaToModify, ...updatedMedia };
    media[index] = modifiedMedia;
    await writemedia(media);
    res.send(modifiedMedia);
  } catch (error) {
    next(error);
  }
});
mediaRoute.delete("/:mediaId", async (req, res, next) => {
  try {
    const media = await readMedia();
    const filteredMedia = media.filter(
      (m) => m.imdbID !== req.params.mediaId
    );
    await writeMedia(filteredMedia);
    res.status(204).send("deleted successfully");
  } catch (error) {
    next(error);
  }
});
mediaRoute.get("/:mediaId/reviews", async (req, res, next) => {
    try {
      const media = await readMedia();
      const mediaa = media.find((m) => m.mediaId === req.params.mediaId);
      if (mediaa) {
        mediaa.reviews = mediaa.reviews || [];
        res.send(mediaa.reviews);
      } else {
        next(createHttpError(404, `media  not found`));
      }
    } catch (error) {
      next(error);
    }
  });
  
  mediaRoute.post("/:mediaId/reviews", async (req, res, next) => {
    try {
      const { imdbID } = req.params.mediaId;
      const errorsList = validationResult(req);
      if (!errorsList.isEmpty()) {
        next(createHttpError(400, { errorsList }));
      } else {
        const media = await readMedia();
        const index = media.findIndex((m) => m.mediaId === req.params.mediaId);
        let mediaToBeUpdated = media[index];
        mediaToBeUpdated.reviews = mediaToBeUpdated.reviews || [];
  
        const newReview = {
          comment: req.body.comment,
          rate: req.body.rate,
          imdbID: uniqid(),
          elementId: imdbID,
          createdAt: new Date(),
        };
  
        const updatedMedia = {
          ...mediaToBeUpdated,
          reviews: [...mediaToBeUpdated.reviews, newReview],
        };
  
        media[index] = updatedMedia;
  
        writeMedia(media);
  
        res.send(updatedMedia);
      }
    } catch (error) {
      next(error);
    }
  });
  


export default mediaRoute;
