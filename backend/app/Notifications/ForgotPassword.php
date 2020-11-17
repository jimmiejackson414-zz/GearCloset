<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializeModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ForgotPassword extends Notification
{
    use Queueable, SerializeModels;

    public $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        $url = url(config('app.url') + '/new-password').route(['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false);

        return (new MailMessage)
                    ->view('emails.forgotPassword')
                    ->subject(Lang::getFromJson('Reset Gear Closet Password'))
                    ->line(Lang::getFromJson('You are receiving this email because we received a password reset request for your account.'))
                    ->action(Lang::getFromJson('Reset Password'), $url)
                    ->line(Lang::getFromJson('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.users.expire')]))
                    ->line(Lang::getFromJson('If you did not request a password reset, no further action is required.'))
                    ->with([ 'test_message' => $this->data['message']]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
