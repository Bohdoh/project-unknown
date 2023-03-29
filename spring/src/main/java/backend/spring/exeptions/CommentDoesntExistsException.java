package backend.spring.exeptions;

public class CommentDoesntExistsException extends Exception {
    public CommentDoesntExistsException(String message) {super(message);}
}
