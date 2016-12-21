defmodule Codenames.GameChannel do
  use Phoenix.Channel

  def join("game:public", _message, socket) do
    IO.inspect('joining')
    {:ok, socket}
  end

  def join("game:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("message", payload, socket) do
      broadcast! socket, "message", payload
      {:noreply, socket}
    end

    def handle_out("message", payload, socket) do
      push socket, "message", payload
      {:noreply, socket}
    end
end
