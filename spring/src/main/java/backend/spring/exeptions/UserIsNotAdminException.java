package backend.spring.exeptions;

public class UserIsNotAdminException extends Throwable {
    public UserIsNotAdminException(String message) {
        super(message);
    }
}
