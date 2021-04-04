package usecase

import (
	"context"
	"fmt"
	"log"

	"github.com/swaggest/usecase"
	"github.com/swaggest/usecase/status"
	"task-api.example.com/internal/domain/task"
)

// FindTasks creates usecase interactor.
func FindTasks(deps interface {
	TaskFinder() task.Finder
}) usecase.IOInteractor {
	u := usecase.NewIOI(nil, new([]task.Entity), func(ctx context.Context, input, output interface{}) error {
		out, ok := output.(*[]task.Entity)
		log.Printf("FindTasks \n")

		if !ok {
			return fmt.Errorf("%w: unexpected output type %T", status.Unimplemented, output)
		}

		*out = deps.TaskFinder().Find(ctx)
		log.Printf("task: %v\n", *out)

		return nil
	})

	u.SetDescription("Find all tasks.")
	u.Output = new([]task.Entity)
	u.SetTags("Tasks")

	return u
}
