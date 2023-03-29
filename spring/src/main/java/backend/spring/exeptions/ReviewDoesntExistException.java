package backend.spring.exeptions;

public class ReviewDoesntExistException extends Exception{
    public ReviewDoesntExistException(String message) {super(message);}
}
