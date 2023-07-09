import ErrorHandler from "../middlewares/error.js";
import { Task } from "../model/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "buhut sahiii maan gye",
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    let userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(201).json({
      success: true,
      message: "here is your task",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const tasks = await Task.findById(req.params.id);

    if (!tasks) return next(new ErrorHandler("Taks Not Found", 404));

    tasks.deleteOne();

    res.status(201).json({
      success: true,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const tasks = await Task.findById(req.params.id);

    if (!tasks) return next(new ErrorHandler("Taks Not Found", 404));

    tasks.isCompleted = !tasks.isCompleted;

    await tasks.save();

    res.status(201).json({
      success: true,
      message: "update",
    });
  } catch (error) {
    next(error);
  }
};
